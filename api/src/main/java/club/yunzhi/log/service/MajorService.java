package club.yunzhi.log.service;

import club.yunzhi.log.entity.Major;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MajorService {

    String save(Major major);

    Major update(Long id,Major major);

    void deleteById(Long id);

    Major findById(Long id);

    Page<Major> findAll(String name, Pageable pageable);

    List<Major> getAll();
}
