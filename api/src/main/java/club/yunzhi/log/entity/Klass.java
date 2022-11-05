package club.yunzhi.log.entity;


import com.mengyunzhi.core.entity.YunzhiEntity;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

/**
 * 班级实体
 */
@Entity
public class Klass implements YunzhiEntity<Long> {
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

    public Long getId() {
        return id;
    }

    @Override
    public Boolean getDeleted() {
        return null;
    }

    @Override
    public void setAllFieldsToNull() {
        YunzhiEntity.super.setAllFieldsToNull();
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
