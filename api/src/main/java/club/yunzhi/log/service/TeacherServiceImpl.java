package club.yunzhi.log.service;

import club.yunzhi.log.entity.Teacher;
import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.TeacherRepository;
import club.yunzhi.log.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Override
    public String save(Teacher teacher) {
        User user = teacher.getUser();
        User newUser = this.userRepository.save(user);
        newUser.setPassword("yunzhi");
        teacher.setUser(newUser);
        this.teacherRepository.save(teacher);
        return "yunzhi";
    }

    @Override
    public Teacher update(Long id, Teacher newteacher) {
        System.out.println("test" + newteacher.getUser().getId());
        Teacher oldteacher = this.teacherRepository.findById(id).get();
        this.userService.update(newteacher.getUser().getId(), newteacher.getUser());
        return this.teacherRepository.save(oldteacher);
    }

    @Override
    public void deleteById(Long id) {
        Teacher teacher = this.teacherRepository.findById(id).get();
        Long userId = teacher.getUser().getId();
        this.teacherRepository.deleteById(id);
        this.userRepository.deleteById(userId);
    }

    @Override
    public Teacher findById(Long id) {
        return teacherRepository.findById(id).get();
    }

    @Override
    public Page<Teacher> findAll(String name, String username, Pageable pageable) {
        Page<Teacher> page = teacherRepository.findAll(name, username, pageable);
        return page;
    }

    @Override
    public List<Teacher> getAll() {
        return (List<Teacher>) this.teacherRepository.findAll();
    }

    @Override
    public Teacher findByUser(Long userId) {
        return this.teacherRepository.findByUser(userId);
    }
}
