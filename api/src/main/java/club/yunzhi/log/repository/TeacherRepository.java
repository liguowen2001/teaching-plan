package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Teacher;
import club.yunzhi.log.repository.specs.TeacherSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

public interface TeacherRepository extends PagingAndSortingRepository<Teacher, Long>, JpaSpecificationExecutor {

    default Page findAll(String name, String username, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Teacher> specification = TeacherSpecs.containingName(name)
                .and(TeacherSpecs.containingUsername(username));
        return this.findAll(specification, pageable);
    }

    default Teacher findByUser(Long userId) {
        Specification<Teacher> specification = TeacherSpecs.belongToUser(userId);
        return (Teacher) this.findOne(specification).get();
    }

}
