describe('View tag adjustments', () => {
  describe('from /mod page', () => {
    beforeEach(() => {
      cy.testSetup();
      cy.fixture('users/adminUser.json').as('user');

      cy.get('@user').then((user) => {
        cy.loginAndVisit(user, '/mod');
      });
    });

    // Helper function for pipe command
    const click = ($el) => $el.click();

    it('should show previous tag adjustments', () => {
      cy.findByRole('heading', { name: 'Tag adjusted article' }).click();

      cy.getIframeBody('.actions-panel-iframe').within(() => {
        cy.findByRole('button', {
          name: 'Open adjust tags section',
        })
          .pipe(click)
          .should('have.attr', 'aria-expanded', 'true');

        cy.get('#tag-history-heading').scrollIntoView();
        cy.get('#tag-adjustment-history')
          .find('.tag-adjustment')
          .should(($div) => {
            expect($div[0].innerText).to.contain(
              '# tag1 removed by Admin McAdmin\nremoving test tag 1',
            );
            expect($div[1].innerText).to.contain(
              '# tag2 added by Admin McAdmin\nadding test tag 2',
            );
          });

        cy.get('#expand-tag-history').pipe(click);
      });

      cy.get('.crayons-modal__box').should(($modalDiv) => {
        expect($modalDiv[0].innerText).to.contain(
          '# tag0 added by Admin McAdmin\nadding test tag 0',
        );
      });
    });
  });

  describe('from /mod/tagname page', () => {
    beforeEach(() => {
      cy.testSetup();
      cy.fixture('users/adminUser.json').as('user');

      cy.get('@user').then((user) => {
        cy.loginAndVisit(user, '/mod/tag1');
      });
    });

    // Helper function for pipe command
    const click = ($el) => $el.click();

    it('should show previous tag adjustments', () => {
      cy.findByRole('heading', { name: 'Tag adjusted article' }).click();

      cy.getIframeBody('.actions-panel-iframe').within(() => {
        cy.findByRole('button', {
          name: 'Open adjust tags section',
        })
          .pipe(click)
          .should('have.attr', 'aria-expanded', 'true');

        cy.get('#tag-history-heading').scrollIntoView();
        cy.get('#tag-adjustment-history')
          .find('.tag-adjustment')
          .should(($div) => {
            expect($div[0].innerText).to.contain(
              '# tag1 removed by Admin McAdmin\nremoving test tag 1',
            );
            expect($div[1].innerText).to.contain(
              '# tag2 added by Admin McAdmin\nadding test tag 2',
            );
          });

        cy.get('#expand-tag-history').pipe(click);
      });

      cy.get('.crayons-modal__box').should(($modalDiv) => {
        expect($modalDiv[0].innerText).to.contain(
          '# tag0 added by Admin McAdmin\nadding test tag 0',
        );
      });
    });
  });

  describe('from article page', () => {
    beforeEach(() => {
      cy.testSetup();
      cy.fixture('users/adminUser.json').as('user');

      cy.get('@user').then((user) => {
        cy.loginAndVisit(user, '/admin_mcadmin/tag-adjusted-article');
      });
    });

    // Helper function for pipe command
    const click = ($el) => $el.click();

    it('should show previous tag adjustments', () => {
      cy.findByRole('heading', { name: 'Tag adjusted article' }).click();

      cy.getIframeBody('#mod-container').within(() => {
        cy.findByRole('button', {
          name: 'Open adjust tags section',
        })
          .pipe(click)
          .should('have.attr', 'aria-expanded', 'true');

        cy.get('#tag-history-heading').scrollIntoView();
        cy.get('#tag-adjustment-history')
          .find('.tag-adjustment')
          .should(($div) => {
            expect($div[0].innerText).to.contain(
              '# tag1 removed by Admin McAdmin\nremoving test tag 1',
            );
            expect($div[1].innerText).to.contain(
              '# tag2 added by Admin McAdmin\nadding test tag 2',
            );
          });

        cy.get('#expand-tag-history').pipe(click);
      });

      cy.get('.crayons-modal__box').should(($modalDiv) => {
        expect($modalDiv[0].innerText).to.contain(
          '# tag0 added by Admin McAdmin\nadding test tag 0',
        );
      });
    });
  });
});
