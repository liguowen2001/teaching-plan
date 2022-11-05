package club.yunzhi.log.service;

import club.yunzhi.log.entity.Course;
import club.yunzhi.log.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;

    @Override
    public String save(Course course) {
        this.courseRepository.save(course);
        return "success";
    }

    @Override
    public Course update(Long id, Course newCourse) {
        Course oldCourse = this.courseRepository.findById(id).get();
        oldCourse.setName(newCourse.getName());
        oldCourse.setCourseCredit(newCourse.getCourseCredit());
        oldCourse.setExaminationMethod(newCourse.getExaminationMethod());
        oldCourse.setSemester(newCourse.getSemester());
        oldCourse.setExperimentalCredit(newCourse.getExperimentalCredit());
        return this.courseRepository.save(oldCourse);
    }

    @Override
    public void deleteById(Long id) {
        this.courseRepository.deleteById(id);
    }

    @Override
    public Course findById(Long id) {
        return courseRepository.findById(id).get();
    }

    @Override
    public Page<Course> findAll(String name,Long majorId ,Pageable pageable) {
        Page<Course> page = courseRepository.findAll(name,majorId,pageable);
        return page;
    }

    @Override
    public List<Course> getAll() {
        return (List<Course>) this.courseRepository.findAll();
    }
}
