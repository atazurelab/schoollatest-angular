import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  it('Shoud Return Yes on true', () => {
    const pipe = new YesNoPipe();
    //expect(pipe).toBeTruthy(); 
    expect(pipe.transform(true)).toBe('Yes');
    

  });

  it('Shoud Return NO on false', () => {
    const pipe = new YesNoPipe();
    //expect(pipe).toBeTruthy(); 
    expect(pipe.transform(false)).toEqual('No');
    

  });


  it('Shoud return blank on null', () => {
    const pipe = new YesNoPipe();
    //expect(pipe).toBeTruthy(); 
    expect(pipe.transform('')).toBe('No');
    

  });


});
