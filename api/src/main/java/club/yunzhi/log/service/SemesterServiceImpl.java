package club.yunzhi.log.service;

import club.yunzhi.log.entity.Semester;
import club.yunzhi.log.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterServiceImpl implements SemesterService {

    @Autowired
    SemesterRepository semesterRepository;

    @Override
    public String save(Semester Semester) {
        this.semesterRepository.save(Semester);
        return "success";
    }

    @Override
    public Semester update(Long id, Semester newSemester) {
        Semester oldSemester = this.semesterRepository.findById(id).get();
        oldSemester.setName(newSemester.getName());
        oldSemester.setStartTime(newSemester.getStartTime());
        oldSemester.setEndTime(newSemester.getEndTime());
        return this.semesterRepository.save(oldSemester);
    }

    @Override
    public void deleteById(Long id) {
        this.semesterRepository.deleteById(id);
    }

    @Override
    public Semester findById(Long id) {
        return semesterRepository.findById(id).get();
    }

    @Override
    public Page<Semester> findAll(String name, Pageable pageable) {
        Page<Semester> page = semesterRepository.findAll(name, pageable);
        return page;
    }

    @Override
    public List<Semester> getAll() {
        return (List<Semester>) this.semesterRepository.findAll();
    }
}
