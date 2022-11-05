package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Course;
import club.yunzhi.log.repository.specs.CourseSpecs;
import club.yunzhi.log.repository.specs.KlassSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

public interface CourseRepository extends PagingAndSortingRepository<Course,Long>, JpaSpecificationExecutor {

    default Page findAll(String name,Long semesterId,@NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Course> specification = CourseSpecs.containingName(name)
                .and(CourseSpecs.belongToSemester(semesterId));
        return this.findAll(specification, pageable);
    }

}
