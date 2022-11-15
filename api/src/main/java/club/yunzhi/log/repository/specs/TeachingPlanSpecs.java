package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;


public class TeachingPlanSpecs {

    public static Specification<TeachingPlan> containingName(String name) {
        if (name != null) {
            return (Specification<TeachingPlan>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<TeachingPlan> belongToSemester(Long semesterId) {

        Semester semester = new Semester();
        semester.setId(semesterId);
        if (semesterId != null) {
            return (Specification<TeachingPlan>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("course").get("semester").as(Semester.class), semester);
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<TeachingPlan> belongToTeacher(Long teacherId) {

        Teacher teacher = new Teacher();
        teacher.setId(teacherId);
        if (teacherId != null) {
            return (Specification<TeachingPlan>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("teacher").as(Teacher.class), teacher);
        } else {
            return Specification.where(null);
        }
    }


}
