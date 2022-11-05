package club.yunzhi.log.service;

import club.yunzhi.log.entity.Klass;
import club.yunzhi.log.repository.KlassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KlassServiceImpl implements KlassService {

    @Autowired
    KlassRepository KlassRepository;

    @Override
    public String save(Klass klass) {
        this.KlassRepository.save(klass);
        return "success";
    }

    @Override
    public Klass update(Long id, Klass newKlass) {
        Klass oldKlass = this.KlassRepository.findById(id).get();
        oldKlass.setName(newKlass.getName());
        oldKlass.setMajor(newKlass.getMajor());
        oldKlass.setName(newKlass.getName());
        return this.KlassRepository.save(oldKlass);
    }

    @Override
    public void deleteById(Long id) {
        this.KlassRepository.deleteById(id);
    }

    @Override
    public Klass findById(Long id) {
        return KlassRepository.findById(id).get();
    }

    @Override
    public Page<Klass> findAll(String name,Long majorId ,Pageable pageable) {
        Page<Klass> page = KlassRepository.findAll(name,majorId,pageable);
        return page;
    }

    @Override
    public List<Klass> getAll() {
        return (List<Klass>) this.KlassRepository.findAll();
    }
}
