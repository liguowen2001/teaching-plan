package club.yunzhi.log.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

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

    @JsonBackReference
    @ManyToMany(targetEntity = Klass.class)
    @JoinTable(name = "klass_teaching_plan",
        joinColumns = {@JoinColumn(name = "kt_t_id",referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "kt_k_id",referencedColumnName = "id")})

    private Set<Klass> klasses;

    private String teachingFocus;

    public String getTeachingFocus() {
        return teachingFocus;
    }

    public void setTeachingFocus(String teachingFocus) {
        this.teachingFocus = teachingFocus;
    }

    public Set<Klass> getKlasses() {
        return klasses;
    }

    public void setKlasses(Set<Klass> klasses) {
        this.klasses = klasses;
    }

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


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
