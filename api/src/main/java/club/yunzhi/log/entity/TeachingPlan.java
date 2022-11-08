package club.yunzhi.log.entity;

import javax.persistence.*;
import java.util.List;

/**
 * 教学计划
 */
@Entity
public class TeachingPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne
    private Teacher teacher;

    @OneToOne
    private Course course;

    @ManyToMany
    private List<Klass> klasses;


    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Klass> getKlasses() {
        return klasses;
    }

    public void setKlasses(List<Klass> klasses) {
        this.klasses = klasses;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
