package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Course;
import club.yunzhi.log.service.CourseService;
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
 * 课程
 */
@RestController
@RequestMapping("course")
public class CourseController {

    private final static Logger logger = LoggerFactory.getLogger(CourseController.class);

    @Autowired
    private CourseService courseService;

    @Autowired
    public CourseController(final CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public Long save(@RequestBody final Course course) {
        return this.courseService.save(course);
    }

    @GetMapping("page")
    public Page<Course> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long semesterId,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Course> courses = new PageImpl(this.courseService.findAll(name, semesterId, pageable));
        return courses;
    }

    @GetMapping("getAll")
    public List<Course> getAll() {
        return this.courseService.getAll();
    }

    @GetMapping("{id}")
    public Course getById(@PathVariable Long id) {
        return this.courseService.findById(id);
    }

    @PutMapping("{id}")
    public Course update(@PathVariable Long id, @RequestBody Course course) {
        return this.courseService.update(id, course);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.courseService.deleteById(id);
    }
}
