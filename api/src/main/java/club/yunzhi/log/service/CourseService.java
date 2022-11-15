package club.yunzhi.log.service;

import club.yunzhi.log.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CourseService {

    Long save(Course course);

    Course update(Long id,Course course);

    void deleteById(Long id);

    Course findById(Long id);

    Page<Course> findAll(String name, Long semesterId, Pageable pageable);

    List<Course> getAll();
}
