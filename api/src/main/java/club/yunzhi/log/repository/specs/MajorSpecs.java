package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Major;
import org.springframework.data.jpa.domain.Specification;

public class MajorSpecs {
    public static Specification<Major> containingName(String name) {
        if (name != null) {
            return (Specification<Major>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }




}
