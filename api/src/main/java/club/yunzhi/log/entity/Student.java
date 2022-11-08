package club.yunzhi.log.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 用户
     */
    @OneToOne
    private User user;


    /**
     * 班级
     */
    @ManyToOne
    private Klass klass;

    public List<TeachingPlan> getTeachingPlans() {
        return teachingPlans;
    }

    public void setTeachingPlans(List<TeachingPlan> teachingPlans) {
        this.teachingPlans = teachingPlans;
    }

    @ManyToMany
    private List<TeachingPlan> teachingPlans;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Klass getKlass() {
        return klass;
    }

    public void setKlass(Klass klass) {
        this.klass = klass;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
