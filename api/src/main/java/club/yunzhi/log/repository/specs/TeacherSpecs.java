package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Teacher;
import club.yunzhi.log.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class TeacherSpecs {

    public static Specification<Teacher> containingName(String name) {
        if (name != null) {
            return (Specification<Teacher>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("user").get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Teacher> containingUsername(String username) {
        if (username != null) {
            return (Specification<Teacher>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("user").get("username").as(String.class), String.format("%%%s%%", username));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Teacher> belongToUser(Long userId) {
        User user = new User();
        user.setId(userId);
        if (userId != null) {
            return (Specification<Teacher>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("user").as(User.class), user);
        } else {
            return Specification.where(null);
        }
    }


}
