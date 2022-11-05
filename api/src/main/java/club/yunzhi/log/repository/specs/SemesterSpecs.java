package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Semester;
import org.springframework.data.jpa.domain.Specification;

public class SemesterSpecs {

    public static Specification<Semester> containingName(String name) {
        if (name != null) {
            return (Specification<Semester>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }


}
