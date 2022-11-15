package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Student;
import club.yunzhi.log.entity.TeachingPlan;
import club.yunzhi.log.repository.specs.StudentSpecs;
import club.yunzhi.log.repository.specs.TeachingPlanSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

public interface TeachingPlanRepository extends PagingAndSortingRepository<TeachingPlan, Long>, JpaSpecificationExecutor {

    default Page findAll(String name, Long semesterId, Long teacherId, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<TeachingPlan> specification = TeachingPlanSpecs.containingName(name)
                .and(TeachingPlanSpecs.belongToTeacher(teacherId))
                .and(TeachingPlanSpecs.belongToSemester(semesterId));
        return this.findAll(specification, pageable);
    }

}
