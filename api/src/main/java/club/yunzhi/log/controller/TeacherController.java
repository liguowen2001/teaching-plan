package club.yunzhi.log.controller;


import club.yunzhi.log.entity.Teacher;
import club.yunzhi.log.service.TeacherService;
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
 * 学生
 */
@RestController
@RequestMapping("teacher")
public class TeacherController {

    private final static Logger logger = LoggerFactory.getLogger(TeacherController.class);

    @Autowired
    private TeacherService teacherService;

    @Autowired
    public TeacherController(final TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping
    public String save(@RequestBody final Teacher teacher) {
        return this.teacherService.save(teacher);
    }

    @GetMapping("page")
    public Page<Teacher> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String username,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Teacher> teachers = new PageImpl(this.teacherService.findAll(name, username, pageable));
        return teachers;
    }

    @GetMapping("getAll")
    public List<Teacher> getAll() {
        return this.teacherService.getAll();
    }

    @GetMapping("{id}")
    public Teacher getById(@PathVariable Long id) {
        return this.teacherService.findById(id);
    }

    @PutMapping("{id}")
    public Teacher update(@PathVariable Long id, @RequestBody Teacher teacher) {
        return this.teacherService.update(id, teacher);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.teacherService.deleteById(id);
    }
}
