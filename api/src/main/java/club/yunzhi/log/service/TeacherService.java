package club.yunzhi.log.service;

import club.yunzhi.log.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TeacherService {

    String save(Teacher teacher);

    Teacher update(Long id, Teacher teacher);

    void deleteById(Long id);

    Teacher findById(Long id);

    Page<Teacher> findAll(String name, String username, Pageable pageable);

    List<Teacher> getAll();

    Teacher findByUser(Long userId);
}
