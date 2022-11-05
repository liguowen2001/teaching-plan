package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Semester;
import club.yunzhi.log.service.SemesterService;
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
 * 学期
 */
@RestController
@RequestMapping("semester")
public class SemesterController {

    private final static Logger logger = LoggerFactory.getLogger(SemesterController.class);

    @Autowired
    private SemesterService semesterService;

    @Autowired
    public SemesterController(final SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @PostMapping
    public void save(@RequestBody final Semester Semester) {
        this.semesterService.save(Semester);
    }

    @GetMapping("page")
    public Page<Semester> page(
            @RequestParam(required = false) String name,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Semester> Semesteres = new PageImpl(this.semesterService.findAll(name, pageable));
        return Semesteres;
    }

    @GetMapping("getAll")
    public List<Semester> getAll() {
        return this.semesterService.getAll();
    }

    @GetMapping("{id}")
    public Semester getById(@PathVariable Long id) {
        return this.semesterService.findById(id);
    }

    @PutMapping("{id}")
    public Semester update(@PathVariable Long id, @RequestBody Semester Semester) {
        return this.semesterService.update(id, Semester);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.semesterService.deleteById(id);
    }
}
