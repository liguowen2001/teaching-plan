package club.yunzhi.log.controller;

import club.yunzhi.log.entity.TeachingPlan;
import club.yunzhi.log.service.TeachingPlanService;
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
@RequestMapping("teachingPlan")
public class TeachingPlanController {

    private final static Logger logger = LoggerFactory.getLogger(TeachingPlanController.class);

    @Autowired
    private TeachingPlanService teachingPlanService;

    @Autowired
    public TeachingPlanController(final TeachingPlanService teachingPlanService) {
        this.teachingPlanService = teachingPlanService;
    }

    @PostMapping
    public void save(@RequestBody final TeachingPlan teachingPlan) {
        this.teachingPlanService.save(teachingPlan);
    }

    @GetMapping("page")
    public Page<TeachingPlan> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long semesterId,
            @RequestParam(required = false) Long teacherId,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<TeachingPlan> teachingPlanes = new PageImpl(this.teachingPlanService.findAll(name,semesterId,teacherId ,pageable));
        return teachingPlanes;
    }

    @GetMapping("getAll")
    public List<TeachingPlan> getAll() {
        return this.teachingPlanService.getAll();
    }

    @GetMapping("{id}")
    public TeachingPlan getById(@PathVariable Long id) {
        return this.teachingPlanService.findById(id);
    }

    @PutMapping("{id}")
    public TeachingPlan update(@PathVariable Long id, @RequestBody TeachingPlan teachingPlan) {
        return this.teachingPlanService.update(id, teachingPlan);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.teachingPlanService.deleteById(id);
    }
}
