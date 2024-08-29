using SteeringMariaMaui.Model;
using System.Diagnostics;

namespace SteeringMariaMaui;

public partial class LedStatusPage : ContentPage
{
	
	private Dictionary<string,CheckBox> gridpositions = new Dictionary<string, CheckBox>(); 
    LedControler ledControler=new LedControler();
	public LedStatusPage()
	{
		InitializeComponent();
		ledControler.StatusReady+=OnStatusReady;
		ledControler.RequestLedStatus();

	}

    private void SetCommonCheckboxes(){
		var allOn=true;
		var allOff=true;
		foreach(KeyValuePair<string, CheckBox> entry in gridpositions)
		{
    	    if (entry.Value.IsChecked){
				allOff=false;
			} else {
				allOn=false;
			}
		}
		AllLedOn.IsChecked=allOn;
		AllLedOff.IsChecked=allOff;
	}
    
	bool blockBoxChecked = false;
	void OnCheckedChanged(object sender, CheckedChangedEventArgs e)
	{
		Trace.WriteLine("Got event");
		if (! blockBoxChecked){
			Trace.WriteLine("Not blocked");
			blockBoxChecked=true;
			List<LedControler.LedStatus> controler=new List<LedControler.LedStatus>();
			foreach(KeyValuePair<string, CheckBox> entry in gridpositions){
				var status = new LedControler.LedStatus
				{
					Name = entry.Key,
					On = entry.Value.IsChecked
				};
				controler.Add(status);
			    Trace.WriteLine(entry.Key + " " +entry.Value.IsChecked.ToString());	
			}
			Trace.WriteLine("SetCommon");
			SetCommonCheckboxes();
			ledControler.PutLedStatus(controler);
			Trace.WriteLine("Unblock");
			blockBoxChecked=false;
		}
	
	}

	private void UpdateGrid(LedControler.LedStatus status){
		if (! gridpositions.ContainsKey(status.Name)){
			AllLedStatus.AddRowDefinition(new RowDefinition());
			var rowNr=AllLedStatus.RowDefinitions.Count-1;
			
            Label l = new Label();
			l.Text=status.Name;
			CheckBox b = new CheckBox();
			gridpositions.Add(status.Name,b);
			b.IsChecked=status.On;
			b.CheckedChanged+=OnCheckedChanged;
			AllLedStatus.Add(l,0,rowNr);
			AllLedStatus.Add(b,1,rowNr);
		} else {
			CheckBox b=gridpositions[status.Name];
			b.IsChecked=status.On;
			
		}
		SetCommonCheckboxes();
	}

	public void OnStatusReady(object sender,EventArgs args){
		Trace.WriteLine("Updating LED Names");
		var status =(StatusReadyArgs)args;
		List<LedControler.LedStatus> lst = (List<LedControler.LedStatus>)status.Status;
		foreach (LedControler.LedStatus item in lst)
		{
			UpdateGrid(item);
			
		}
		Trace.WriteLine("LED Fields are added");
		
	}

	
}

