import Vue from 'vue';
import MD5 from 'md5';

Vue.mixin({
	methods: {
		gravatarImage: function(email) {
			const hash = MD5(email.toLowerCase());
			return `https://www.gravatar.com/avatar/${hash}`;
		},
		createID: function() {
			return (
				'_' +
				Math.random()
					.toString(36)
					.substr(2, 9)
			);
		},
		grid: function(v) {
			return `${(100 / 24) * parseInt(v)}vw`;
		},
		randomNumber: function(min, max) {
			return Math.floor(Math.random() * (+max - +min)) + +min;
		},
		flat: function(arr) {
			return arr.reduce((acc, val) => {
				return Array.isArray(val) ? acc.concat(this.flat(val)) : acc.concat(val);
			}, []);
		},
		isIE: function() {
			const ua = window.navigator.userAgent;
			const msie = ua.indexOf('MSIE ');
			/* eslint-disable */

			if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
				// If Internet Explorer, return version number
				return true;
				// alert(parseInt(ua.substring(msie + 5, ua.indexOf('.', msie))));
			} // If another browser, return 0
			else {
				return false;
				// alert('otherbrowser');
			} /* eslint-enable */
		},
		chain(obj, ...props) {
			const val = obj[props[0]];
			if (props.length === 1 || !val) {
				return val;
			}
			const rest = props.slice(1);
			return this.chain.apply(null, [val, ...rest]);
		}
	}
});
