package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Student;
import club.yunzhi.log.repository.specs.StudentSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long>, JpaSpecificationExecutor {

    default Page findAll(String name, Long klassId, String username,@NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Student> specification = StudentSpecs.containingName(name)
                .and(StudentSpecs.containingUsername(username))
                .and(StudentSpecs.belongToKlass(klassId));
        return this.findAll(specification, pageable);
    }

}
