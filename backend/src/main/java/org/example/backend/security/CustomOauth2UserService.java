package org.example.backend.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.List;

public class CustomOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepo repo;

    public CustomOauth2UserService(UserRepo repo) {
        this.repo = repo;
    }


    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        AppUser appUser = repo.findById(oAuth2User.getName())
                .orElseGet(() -> createAndSaveNewUser(oAuth2User));

        return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(appUser.role())), oAuth2User.getAttributes(), oAuth2User.getName());
    }


    private AppUser createAndSaveNewUser(OAuth2User oauth2User) {
        AppUser newUser = AppUser.builder()
                .id(oauth2User.getName())
                .username(oauth2User.getAttribute("login"))
                .role("USER")
                .build();

        return newUser;
    }
}
