import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('1 - testando a página de Login', () => {
  it('1.1 - Testando se os componentes da página de Login',
    () => {
      renderWithRouterAndRedux(<App />);
      const inputName = screen.getByRole('textbox', {  name: /name:/i})
      const inputEmail = screen.getByRole('textbox', {  name: /email:/i})
      const buttonPlay = screen.getByRole('button', {  name: /play/i})
      const buttonConfig = screen.getByRole('button', {  name: /configure/i})
     
      expect(buttonPlay).toBeDisabled();
      expect(inputName).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument(); 
      expect(buttonConfig).toBeInTheDocument();
      
      userEvent.type(inputName, 'test')
      userEvent.type(inputEmail, 'test')

      expect(buttonPlay).toBeEnabled()

      userEvent.click(buttonPlay)

      const img = screen.getByRole('img', {  name: /profile\-img/i})
      expect(img).toBeInTheDocument();
    });  
    
    it('1.2 - Testando a funcionabilidade do botão config da página de Login', () => {
      renderWithRouterAndRedux(<App />);
      const buttonConfig = screen.getByRole('button', {  name: /configure/i})
      expect(buttonConfig).toBeInTheDocument();
      
      userEvent.click(buttonConfig)
      const title = screen.getByRole('heading', {  name: /página de configuração/i})
      expect(title).toBeInTheDocument();

    });
})