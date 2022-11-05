package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Major;
import club.yunzhi.log.service.MajorService;
import club.yunzhi.log.utils.PageImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 专业
 */
@RestController
@RequestMapping("major")
public class MajorController {

    private final static Logger logger = LoggerFactory.getLogger(MajorController.class);

    @Autowired
    private MajorService majorService;

    @Autowired
    public MajorController(final MajorService majorService) {
        this.majorService = majorService;
    }

    @PostMapping
    public void save(@RequestBody final Major Major) {
        this.majorService.save(Major);
    }

    @GetMapping("page")
    public Page<Major> page(
            @RequestParam(required = false) String name,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Major> Majors = new PageImpl(this.majorService.findAll(name, pageable));
        return Majors;
    }

    @GetMapping("getAll")
    public List<Major> getAll() {
        return this.majorService.getAll();
    }

    @GetMapping("{id}")
    public Major getById(@PathVariable Long id) {
        return this.majorService.findById(id);
    }

    @PutMapping("{id}")
    public Major update(@PathVariable Long id, @RequestBody Major Major) {
        return this.majorService.update(id, Major);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.majorService.deleteById(id);
    }
}
