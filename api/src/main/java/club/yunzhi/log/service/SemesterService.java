package club.yunzhi.log.service;

import club.yunzhi.log.entity.Semester;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SemesterService {

    String save(Semester semester);

    Semester update(Long id,Semester semester);

    void deleteById(Long id);

    Semester findById(Long id);

    Page<Semester> findAll(String name, Pageable pageable);

    List<Semester> getAll();
}
