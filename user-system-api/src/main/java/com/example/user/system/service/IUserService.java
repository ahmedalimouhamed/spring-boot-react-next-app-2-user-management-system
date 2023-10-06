package com.example.user.system.service;

import com.example.user.system.model.User;

import java.util.List;

public interface IUserService {
    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(long id);

    boolean deleteUser(long id);

    User updateUser(long id, User userReq);
}
