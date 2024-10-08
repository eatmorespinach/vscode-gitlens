/*global*/
import './home.scss';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { State } from '../../home/protocol';
import { GlApp } from '../shared/app';
import { scrollableBase } from '../shared/components/styles/lit/base.css';
import type { HostIpc } from '../shared/ipc';
import { homeBaseStyles, homeStyles } from './home.css';
import { HomeStateProvider } from './stateProvider';
import '../plus/shared/components/home-account-content';
import './components/feature-nav';
import './components/home-nav';
import './components/repo-alerts';
import './components/onboarding';

@customElement('gl-home-app')
export class GlHomeApp extends GlApp<State> {
	static override styles = [homeBaseStyles, scrollableBase, homeStyles];

	private badgeSource = { source: 'home', detail: 'badge' };

	protected override createStateProvider(state: State, ipc: HostIpc) {
		return new HomeStateProvider(this, state, ipc);
	}

	override render() {
		return html`
			<div class="home scrollable">
				<gl-repo-alerts class="home__header"></gl-repo-alerts>
				<main class="home__main scrollable" id="main">
					<gl-onboarding></gl-onboarding>
					<gl-feature-nav .badgeSource=${this.badgeSource}></gl-feature-nav>
				</main>

				<footer class="home__footer">
					<gl-home-account-content id="account-content">
						<gl-home-nav class="home__nav"></gl-home-nav>
					</gl-home-account-content>
				</footer>
			</div>
		`;
	}
}
