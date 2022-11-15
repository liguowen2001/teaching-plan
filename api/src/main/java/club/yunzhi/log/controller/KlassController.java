package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Klass;
import club.yunzhi.log.entity.Major;
import club.yunzhi.log.entity.TeachingPlan;
import club.yunzhi.log.service.KlassService;
import club.yunzhi.log.utils.PageImpl;
import com.fasterxml.jackson.annotation.JsonView;
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
@RequestMapping("klass")
public class KlassController {

    private final static Logger logger = LoggerFactory.getLogger(KlassController.class);

    @Autowired
    private KlassService klassService;

    @Autowired
    public KlassController(final KlassService klassService) {
        this.klassService = klassService;
    }

    @PostMapping
    public void save(@RequestBody final Klass klass) {
        this.klassService.save(klass);
    }

    @GetMapping("page")
    public Page<Klass> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long majorId,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Klass> klasses = new PageImpl(this.klassService.findAll(name, majorId, pageable));
        return klasses;
    }

    @GetMapping("getAll")
    public List<Klass> getAll() {
        return this.klassService.getAll();
    }

    @GetMapping("{id}")
    public Klass getById(@PathVariable Long id) {
        return this.klassService.findById(id);
    }

    @PutMapping("{id}")
    public Klass update(@PathVariable Long id, @RequestBody Klass Klass) {
        return this.klassService.update(id, Klass);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.klassService.deleteById(id);
    }
}
