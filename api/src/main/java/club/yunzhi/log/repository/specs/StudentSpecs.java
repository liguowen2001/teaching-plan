package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Klass;
import club.yunzhi.log.entity.Student;
import org.springframework.data.jpa.domain.Specification;

public class StudentSpecs {

    public static Specification<Student> containingName(String name) {
        if (name != null) {
            return (Specification<Student>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("user").get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Student> belongToKlass(Long klassId) {
        Klass klass = new Klass();
        klass.setId(klassId);
        if (klassId != null) {
            return (Specification<Student>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("klass").as(Klass.class), klass);
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Student> containingUsername(String username) {
        if (username != null) {
            return (Specification<Student>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("user").get("username").as(String.class), String.format("%%%s%%", username));
        } else {
            return Specification.where(null);
        }
    }


}
