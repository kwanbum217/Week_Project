package com.example.datingapp.security;

import com.example.datingapp.model.User;
import com.example.datingapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);

    String provider = userRequest.getClientRegistration().getRegistrationId();
    String providerId = null;
    String email = null;
    String name = null;

    if ("google".equals(provider)) {
      providerId = oAuth2User.getAttribute("sub");
      email = oAuth2User.getAttribute("email");
      name = oAuth2User.getAttribute("name");
    } else if ("kakao".equals(provider)) {
      providerId = String.valueOf(oAuth2User.getAttribute("id"));
      Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
      if (kakaoAccount != null) {
        email = (String) kakaoAccount.get("email");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        if (profile != null) {
          name = (String) profile.get("nickname");
        }
      }
    } else if ("naver".equals(provider)) {
      Map<String, Object> response = oAuth2User.getAttribute("response");
      if (response != null) {
        providerId = (String) response.get("id");
        email = (String) response.get("email");
        name = (String) response.get("name");
      }
    }

    if (email == null) {
      throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
    }

    User user = saveOrUpdateUser(email, name, provider, providerId);

    return oAuth2User;
  }

  private User saveOrUpdateUser(String email, String name, String provider, String providerId) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    User user;
    if (userOptional.isPresent()) {
      user = userOptional.get();
      user.setProvider(provider);
      user.setProviderId(providerId);
    } else {
      user = new User();
      user.setEmail(email);
      user.setUsername(email); // Use email as username for now
      user.setPassword("OAUTH2_USER"); // Set dummy password for Oracle (empty string is NULL)
      user.setProvider(provider);
      user.setProviderId(providerId);
    }
    return userRepository.save(user);
  }
}
