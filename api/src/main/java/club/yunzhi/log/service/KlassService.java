package club.yunzhi.log.service;

import club.yunzhi.log.entity.Klass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface KlassService {

    String save(Klass klass);

    Klass update(Long id,Klass klass);

    void deleteById(Long id);

    Klass findById(Long id);

    Page<Klass> findAll(String name, Long majorId, Pageable pageable);

    List<Klass> getAll();
}
