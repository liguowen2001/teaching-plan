package club.yunzhi.log.service;

import club.yunzhi.log.entity.TeachingPlan;
import club.yunzhi.log.repository.TeachingPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeachingPlanServiceImpl implements TeachingPlanService {

    @Autowired
    TeachingPlanRepository teachingPlanRepository;

    @Override
    public String save(TeachingPlan teachingPlan) {
        this.teachingPlanRepository.save(teachingPlan);
        return "success";
    }

    @Override
    public TeachingPlan update(Long id, TeachingPlan newTeachingPlan) {
        TeachingPlan oldteachingPlan = this.teachingPlanRepository.findById(id).get();
        oldteachingPlan.setName(newTeachingPlan.getName());
        oldteachingPlan.setKlasses(newTeachingPlan.getKlasses());
        oldteachingPlan.setTeachingFocus(newTeachingPlan.getTeachingFocus());
        return this.teachingPlanRepository.save(oldteachingPlan);
    }

    @Override
    public void deleteById(Long id) {
        this.teachingPlanRepository.deleteById(id);
    }

    @Override
    public TeachingPlan findById(Long id) {
        return teachingPlanRepository.findById(id).get();
    }

    @Override
    public Page<TeachingPlan> findAll(String name,Long semesterId, Long teacherId ,Pageable pageable) {
        Page<TeachingPlan> page = teachingPlanRepository.findAll(name,semesterId,teacherId ,pageable);
        return page;
    }

    @Override
    public List<TeachingPlan> getAll() {
        return (List<TeachingPlan>) this.teachingPlanRepository.findAll();
    }
}
