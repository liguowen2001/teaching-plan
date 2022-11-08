package club.yunzhi.log.service;

import club.yunzhi.log.entity.Student;
import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.StudentRepository;
import club.yunzhi.log.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Override
    public String save(Student student) {
        User user = student.getUser();
        User newUser =  this.userRepository.save(user);
        newUser.setPassword("yunzhi");
        student.setUser(newUser);
        this.studentRepository.save(student);
        return "yunzhi";
    }

    @Override
    public Student update(Long id, Student newStudent) {
        System.out.println("test"+newStudent.getUser().getId());
        Student oldStudent = this.studentRepository.findById(id).get();
        oldStudent.setKlass(newStudent.getKlass());
        this.userService.update(newStudent.getUser().getId(),newStudent.getUser());
        return this.studentRepository.save(oldStudent);
    }

    @Override
    public void deleteById(Long id) {
        Student student = this.studentRepository.findById(id).get();
        Long userId = student.getUser().getId();
        this.studentRepository.deleteById(id);
        this.userRepository.deleteById(userId);
    }

    @Override
    public Student findById(Long id) {
        return studentRepository.findById(id).get();
    }

    @Override
    public Page<Student> findAll(String name, Long majorId, String username,Pageable pageable) {
        Page<Student> page = studentRepository.findAll(name, majorId, username,pageable);
        return page;
    }

    @Override
    public List<Student> getAll() {
        return (List<Student>) this.studentRepository.findAll();
    }
}
