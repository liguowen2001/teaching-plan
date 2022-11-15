package club.yunzhi.log.service;

import club.yunzhi.log.entity.TeachingPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TeachingPlanService {

    String save(TeachingPlan teachingPlan);

    TeachingPlan update(Long id,TeachingPlan teachingPlan);

    void deleteById(Long id);

    TeachingPlan findById(Long id);

    Page<TeachingPlan> findAll(String name,Long semesterId,Long teacherId ,Pageable pageable);

    List<TeachingPlan> getAll();
}
