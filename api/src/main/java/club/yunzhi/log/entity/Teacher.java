package club.yunzhi.log.entity;

import javax.persistence.*;
import java.util.List;

/**
 * 教师
 */
@Entity
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * 用户
     */
    @OneToOne
    private User user;

    @OneToMany
    private List<TeachingPlan> teachingPlans;

    public List<TeachingPlan> getTeachingPlans() {
        return teachingPlans;
    }

    public void setTeachingPlans(List<TeachingPlan> teachingPlans) {
        this.teachingPlans = teachingPlans;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
