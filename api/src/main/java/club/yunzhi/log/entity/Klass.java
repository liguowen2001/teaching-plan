package club.yunzhi.log.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.util.Set;

/**
 * 班级实体
 */
@Entity
public class Klass  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * 名称
     */
    private String name;

    /**
     * 专业
     */
    @ApiModelProperty("类型")
    @ManyToOne
    private Major major;

    @ManyToMany(targetEntity = TeachingPlan.class)
    @JoinTable(name = "klass_teaching_plan",
            joinColumns = {@JoinColumn(name = "kt_k_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "kt_t_id", referencedColumnName = "id")})
    private Set<TeachingPlan> teachingPlans;

    public Long getId() {
        return id;
    }

    public Set<TeachingPlan> getTeachingPlans() {
        return teachingPlans;
    }

    public void setTeachingPlans(Set<TeachingPlan> teachingPlans) {
        this.teachingPlans = teachingPlans;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }


}
