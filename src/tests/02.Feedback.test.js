import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


describe('2 - testando a página de Feedback', () => {
  it('2.1 - Testando se os componentes da página de Login existem',
    () => {
      const player = {       
          name: 'test',
          email: 'test123',        
      };

      const { history } = renderWithRouterAndRedux(<App />,   { player }  );
      history.push('/feedback');
      const img = screen.getByRole('img', {  name: /profile\-img/i})
      const paragraph = screen.getByTestId('header-player-name')
      const score = screen.getByTestId('header-score')
      const assertions = screen.getByTestId('feedback-total-question')
      const scoreTotal = screen.getByTestId('feedback-total-score')
      const feedbackText = screen.getByTestId('feedback-text')
      const btnPlayAgain = screen.getByRole('button', {  name: /play again/i})
      const btnRanking = screen.getByRole('button', {  name: /ranking/i})

      expect(img).toBeInTheDocument()
      expect(paragraph).toBeInTheDocument()
      expect(score).toBeInTheDocument()
      expect(assertions).toBeInTheDocument()
      expect(scoreTotal).toBeInTheDocument()
      expect(feedbackText).toBeInTheDocument()
      expect(btnPlayAgain).toBeInTheDocument()
      expect(btnRanking).toBeInTheDocument()
      expect(history.location.pathname).toBe('/feedback');

    });

    it('2.2 - Testando a funcionabilidade do botão PlayAgain da página de Login',
    () => {
      const player = {       
          name: 'test',
          email: 'test123',        
      };
      const { history } = renderWithRouterAndRedux(<App />,   { player }  );
      history.push('/feedback');     
      
      const btnPlayAgain = screen.getByRole('button', {  name: /play again/i})
      expect(btnPlayAgain).toBeInTheDocument()      

      userEvent.click(btnPlayAgain)
      expect(history.location.pathname).toBe('/')

    });

    it('2.3 - Testando a funcionabilidade do botão Ranking da página de Login',
    () => {
      const player = {       
          name: 'test',
          email: 'test123',        
      };
      const { history } = renderWithRouterAndRedux(<App />,   { player }  );
      history.push('/feedback');           
     
      const btnRanking = screen.getByRole('button', {  name: /ranking/i})   
      expect(btnRanking).toBeInTheDocument()

      userEvent.click(btnRanking)
      expect(history.location.pathname).toBe('/ranking')
    });

    it('2.4 - Testando a mensagem referente aos assertions',
    () => {
      const player = {       
          name: 'test',
          email: 'test123',
          assertions: 3,

      };
      const { history } = renderWithRouterAndRedux(<App />,   { player }  );
      history.push('/feedback');           
      const msg = 'Well Done!'
      const feedbackText = screen.getByTestId('feedback-text')
      expect(feedbackText).toHaveTextContent(msg);
      
    });  
});
