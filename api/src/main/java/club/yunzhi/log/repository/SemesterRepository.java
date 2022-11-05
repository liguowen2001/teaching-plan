package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Semester;
import club.yunzhi.log.repository.specs.SemesterSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

public interface SemesterRepository extends PagingAndSortingRepository<Semester,Long>, JpaSpecificationExecutor {

    default Page findAll(String name,@NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Semester> specification = SemesterSpecs.containingName(name);
        return this.findAll(specification, pageable);
    }

}
