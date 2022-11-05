package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Klass;
import club.yunzhi.log.entity.Major;
import org.springframework.data.jpa.domain.Specification;

public class KlassSpecs {

    public static Specification<Klass> containingName(String name) {
        if (name != null) {
            return (Specification<Klass>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Klass> belongToMajor(Long majorId) {
        Major major = new Major();
        major.setId(majorId);
        if (majorId != null) {
            return (Specification<Klass>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("major").as(Major.class), major);
        }else {
            return Specification.where(null);
        }
    }


}
