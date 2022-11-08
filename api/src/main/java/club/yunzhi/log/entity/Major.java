package club.yunzhi.log.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Major {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * 名称
     */
    private String name;

    /**
     * 培养计划文件名
     */
    private String trainingPlan;

    @ManyToMany
    private List<Course> courses;

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTrainingPlan() {
        return trainingPlan;
    }

    public void setTrainingPlan(String trainingPlan) {
        this.trainingPlan = trainingPlan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
