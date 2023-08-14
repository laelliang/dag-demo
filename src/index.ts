import Container from './container'


window['LinkLine'] = {
  Container
}

declare global {
  interface Window {
    LinkLine: any;
  }
}