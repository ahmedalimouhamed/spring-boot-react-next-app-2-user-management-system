package com.example.user.system.service.impl;

import com.example.user.system.entity.UserEntity;
import com.example.user.system.model.User;
import com.example.user.system.repository.UserRepository;
import com.example.user.system.service.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);
        userRepository.save(userEntity);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        List<User> users = userEntities.stream().map(userEntity -> new User(
                userEntity.getId(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getEmailId()
        )).collect(Collectors.toList());
        return users;
    }

    @Override
    public User getUserById(long id) {
        UserEntity userEntity = userRepository.findById(id).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }

    @Override
    public boolean deleteUser(long id) {
        UserEntity user = userRepository.findById(id).get();
        userRepository.delete(user);
        return true;
    }

    @Override
    public User updateUser(long id, User userBody) {
        UserEntity userEntity = userRepository.findById(id).get();
        userEntity.setEmailId(userBody.getEmailId());
        userEntity.setFirstName(userBody.getFirstName());
        userEntity.setLastName(userBody.getLastName());
        userRepository.save(userEntity);
        return userBody;
    }
}
