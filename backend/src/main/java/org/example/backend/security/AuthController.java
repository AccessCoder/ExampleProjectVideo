package org.example.backend.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @GetMapping
    public AppUser getMe(@AuthenticationPrincipal OAuth2User principal) {
        return AppUser.builder()
                .id(principal.getName())
                .username(principal.getAttributes().get("login").toString())
                .build();
    }
}
