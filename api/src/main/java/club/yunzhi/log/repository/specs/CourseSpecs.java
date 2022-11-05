package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Course;
import club.yunzhi.log.entity.Semester;
import org.springframework.data.jpa.domain.Specification;

public class CourseSpecs {

    public static Specification<Course> containingName(String name) {
        if (name != null) {
            return (Specification<Course>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Course> belongToSemester(Long semesterId) {
        Semester semester = new Semester();
        semester.setId(semesterId);
        if (semesterId != null) {
            return (Specification<Course>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("semester").as(Semester.class), semester);
        } else {
            return Specification.where(null);
        }
    }


}
