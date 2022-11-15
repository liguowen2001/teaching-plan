package club.yunzhi.log.service;

import club.yunzhi.log.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudentService {

    String save(Student student);

    Student update(Long id,Student student);

    void deleteById(Long id);

    Student findById(Long id);

    Page<Student> findAll(String name, Long majorId,String username ,Pageable pageable);

    List<Student> getAll();

    Student findByUserId(Long userId);
}
