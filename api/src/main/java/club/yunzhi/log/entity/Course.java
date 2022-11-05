package club.yunzhi.log.entity;

import javax.persistence.*;

/**
 * 课程
 */
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * 名称
     */
    private String name;

    public Long getId() {
        return id;
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

    public int getCourseCredit() {
        return courseCredit;
    }

    public void setCourseCredit(int courseCredit) {
        this.courseCredit = courseCredit;
    }

    public int getExperimentalCredit() {
        return experimentalCredit;
    }

    public void setExperimentalCredit(int experimentalCredit) {
        this.experimentalCredit = experimentalCredit;
    }

    public String getExaminationMethod() {
        return examinationMethod;
    }

    public void setExaminationMethod(String examinationMethod) {
        this.examinationMethod = examinationMethod;
    }

    /**
     * 学期
     */
    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    /**
     * 课程学分
     */
    private int courseCredit;

    /**
     * 实验学分
     */
    private int experimentalCredit;

    /**
     * 考核方式
     */
    private String examinationMethod;

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }
}
