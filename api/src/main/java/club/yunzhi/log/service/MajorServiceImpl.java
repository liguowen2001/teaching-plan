package club.yunzhi.log.service;

import club.yunzhi.log.entity.Major;
import club.yunzhi.log.repository.MajorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MajorServiceImpl implements MajorService {

    @Autowired
    MajorRepository majorRepository;

    @Override
    public String save(Major major) {
        this.majorRepository.save(major);
        return "success";
    }

    @Override
    public Major update(Long id, Major major) {
        Major oldMajor = this.majorRepository.findById(id).get();
        oldMajor.setName(major.getName());
        oldMajor.setTrainingPlan(major.getTrainingPlan());
        return this.majorRepository.save(oldMajor);
    }

    @Override
    public void deleteById(Long id) {
        this.majorRepository.deleteById(id);
    }

    @Override
    public Major findById(Long id) {
        return majorRepository.findById(id).get();
    }

    @Override
    public Page<Major> findAll(String name, Pageable pageable) {
        Page<Major> page = majorRepository.findAll(name,pageable);
        return page;
    }

    @Override
    public List<Major> getAll() {
        return (List<Major>) this.majorRepository.findAll();
    }
}
