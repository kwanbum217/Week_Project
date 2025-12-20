package com.example.datingapp.security;

import com.example.datingapp.model.User;
import com.example.datingapp.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  @Autowired
  private JwtTokenProvider tokenProvider;

  @Autowired
  private UserRepository userRepository;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
    String email = null;

    // Try to get email from attributes
    Map<String, Object> attributes = oAuth2User.getAttributes();
    if (attributes.containsKey("email")) {
      email = (String) attributes.get("email");
    } else if (attributes.containsKey("kakao_account")) {
      Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
      if (kakaoAccount != null) {
        email = (String) kakaoAccount.get("email");
      }
    } else if (attributes.containsKey("response")) {
      Map<String, Object> naverResponse = (Map<String, Object>) attributes.get("response");
      if (naverResponse != null) {
        email = (String) naverResponse.get("email");
      }
    }

    // If email is still null, try to get it from the name (if
    // CustomOAuth2UserService set it)
    if (email == null) {
      // This is a fallback; CustomOAuth2UserService should have ensured email exists
      // or threw an exception.
      System.out.println("OAuth2SuccessHandler: Email not found in attributes.");
    }

    if (email != null) {
      String token = tokenProvider.generateToken(email);
      // Redirect to frontend with token
      String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/oauth2/redirect")
          .queryParam("token", token)
          .build().toUriString();

      System.out.println("OAuth2SuccessHandler: Redirecting to " + targetUrl);

      if (response.isCommitted()) {
        System.out.println("Response has already been committed. Unable to redirect to " + targetUrl);
        return;
      }

      getRedirectStrategy().sendRedirect(request, response, targetUrl);
    } else {
      // If we can't get the email, we can't generate a token.
      // Redirect to login with error.
      String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/login")
          .queryParam("error", "Email not found from provider")
          .build().toUriString();
      getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
  }
}
