package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Student;
import club.yunzhi.log.service.StudentService;
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
@RequestMapping("student")
public class StudentController {

    private final static Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private StudentService studentService;

    @Autowired
    public StudentController(final StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public String save(@RequestBody final Student student) {
        return this.studentService.save(student);
    }

    @GetMapping("page")
    public Page<Student> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Long klassId,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Student> students = new PageImpl(this.studentService.findAll(name, klassId, username, pageable));
        return students;
    }

    @GetMapping("getAll")
    public List<Student> getAll() {
        return this.studentService.getAll();
    }

    @GetMapping("{id}")
    public Student getById(@PathVariable Long id) {
        return this.studentService.findById(id);
    }

    @PutMapping("{id}")
    public Student update(@PathVariable Long id, @RequestBody Student student) {
        return this.studentService.update(id, student);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.studentService.deleteById(id);
    }
}
